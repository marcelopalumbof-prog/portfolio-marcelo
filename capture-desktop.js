const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;
const DURATION = 48; // aumentado de 24 para 48s
const TOTAL_FRAMES = DURATION * FPS;
const OUT_DIR = path.join(__dirname, 'frames-desktop');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--window-size=' + WIDTH + ',' + HEIGHT,
      '--force-device-scale-factor=1',
      '--hide-scrollbars',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-web-security'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  
  // Navegar para o brag-desktop.html servido localmente
  await page.goto('http://127.0.0.1:8099/brag-desktop.html', { waitUntil: 'networkidle0' });
  
  // Aguardar a animação inicializar e o conteúdo do site carregar
  // O site demora um pouco para carregar via fetch dentro do brag-desktop.html
  await new Promise(r => setTimeout(r, 3500));

  // Verificar se o conteúdo do site foi injetado
  const siteLoaded = await page.evaluate(() => {
    const content = document.getElementById('siteContent');
    return content && content.innerHTML.length > 100 && content.classList.contains('site-loaded');
  });
  
  if (!siteLoaded) {
    console.log('Aguardando mais tempo para o site carregar...');
    await new Promise(r => setTimeout(r, 3000));
  }

  let frameNum = 0;
  const startTime = Date.now();

  for (let i = 0; i <= TOTAL_FRAMES; i++) {
    const targetTime = i / FPS;
    
    // Aguardar até o tempo alvo
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed < targetTime) {
      await new Promise(r => setTimeout(r, (targetTime - elapsed) * 1000));
    }

    const fname = path.join(OUT_DIR, `frame_${String(i).padStart(5, '0')}.png`);
    await page.screenshot({ path: fname, fullPage: false });
    frameNum++;

    if (i % 60 === 0 || i === TOTAL_FRAMES) {
      process.stdout.write(`\rCapturado ${i}/${TOTAL_FRAMES} frames (t=${targetTime.toFixed(2)}s)`);
    }
  }

  console.log('\nTodos os frames capturados:', frameNum);
  await browser.close();

  // Compilar com ffmpeg
  console.log('Compilando vídeo com ffmpeg...');
  const { spawn } = require('child_process');
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(OUT_DIR, 'frame_%05d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '18',
    '-preset', 'slow',
    '-movflags', '+faststart',
    path.join(__dirname, 'brag-desktop.mp4')
  ], { stdio: 'inherit' });

  ffmpeg.on('close', code => {
    if (code === 0) {
      console.log('Vídeo gerado com sucesso: brag-desktop.mp4');
    } else {
      console.error('ffmpeg falhou com código:', code);
    }
  });
}

main().catch(e => {
  console.error('Erro:', e);
  process.exit(1);
});
