import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {CART_KEY} from '../../assets/cart.mjs';
const products=JSON.parse(await readFile(new URL('../../data/products.json',import.meta.url)));
test('responsive storefront renders real assets, metadata and no overflow',async({page},testInfo)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const broken=[];page.on('response',r=>{if(r.status()>=400)broken.push(r.url());});
 await page.goto('/');await expect(page.locator('#result-count')).toContainText('4 productos');await page.evaluate(()=>document.fonts.ready);
 await expect(page).toHaveTitle(/Componentes para PC en Venezuela/);
 await expect(page.locator('h1')).toHaveCount(1);
 await page.locator('.site-footer').scrollIntoViewIfNeeded();await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
 expect(await page.locator('html').getAttribute('lang')).toBe('es-VE');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 expect(await page.locator('img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0))).toBeTruthy();
 await page.screenshot({path:testInfo.outputPath('home.png'),fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
 await page.screenshot({path:testInfo.outputPath('reduced-motion.png'),fullPage:true});
 expect(errors).toEqual([]);expect(broken).toEqual([]);
});
test('search, category and ordering retain a useful result state',async({page})=>{
 await page.goto('/');await expect(page.locator('#result-count')).toContainText('4 productos');
 await page.locator('#search').fill('ddr5');await expect(page.locator('[data-product]:visible')).toHaveCount(1);
 await page.locator('#search').fill('producto inexistente');await expect(page.locator('#no-results')).toBeVisible();
 await page.locator('#clear-search').click();await expect(page.locator('[data-product]:visible')).toHaveCount(4);
 await page.locator('[data-filter="procesadores"]').click();await expect(page.locator('[data-product]:visible')).toHaveCount(1);
 await page.reload();await expect(page.locator('[data-product]:visible')).toHaveCount(1);
 await page.locator('[data-filter="all"]').click();await page.locator('#sort').selectOption('price-asc');
 await expect(page.locator('[data-product]:visible').first()).toHaveAttribute('data-product','corsair-vengeance-rgb-32gb');
});
test('cart totals, persistence, optional details and WhatsApp payload are correct',async({page},testInfo)=>{
 await page.goto('/');await expect(page.locator('#result-count')).toContainText('4 productos');
 await page.locator('[data-add="samsung-990-pro-2tb"]').click();
 await page.locator('[data-add="corsair-vengeance-rgb-32gb"]').click();
 await expect(page.locator('[data-cart-count]')).toHaveText('2');await page.locator('[data-cart]').click();
 await expect(page.locator('#cart')).toBeVisible();await expect(page.locator('#cart-total')).toContainText('284,98');
 await page.locator('input[name="name"]').fill('Prueba de interfaz');await page.locator('input[name="city"]').fill('La Guaira');
 await page.locator('textarea[name="notes"]').fill('¿Compatible con mi placa?');
 await page.locator('summary').filter({hasText:'Revisar el mensaje'}).click();await expect(page.locator('#message-preview')).toContainText('Samsung 990 PRO 2 TB');
 await expect(page.locator('#message-preview')).toContainText('Por favor, confirmen');
 await page.locator('[data-quantity="samsung-990-pro-2tb"]').fill('2');await page.locator('[data-quantity="samsung-990-pro-2tb"]').press('Tab');
 await expect(page.locator('#cart-total')).toContainText('454,97');
 await page.locator('.cart-content').evaluate(el=>el.scrollTop=0);await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:testInfo.outputPath('cart.png')});
 await page.locator('button[type="submit"]').filter({hasText:'Continuar en WhatsApp'}).scrollIntoViewIfNeeded();await page.screenshot({path:testInfo.outputPath('cart-checkout.png')});
 await page.evaluate(()=>{window.open=(url)=>{window.__outbound=url;return null;};});
 await page.locator('button[type="submit"]').filter({hasText:'Continuar en WhatsApp'}).click();
 const outbound=await page.evaluate(()=>window.__outbound);const url=new URL(outbound);
 expect(url.origin+url.pathname).toBe('https://wa.me/584146380868');
 expect(url.searchParams.get('text')).toContain('Cantidad: 2');expect(url.searchParams.get('text')).toContain('Prueba de interfaz');
 expect(url.searchParams.get('text')).toContain('Importe final: por confirmar');
 await page.keyboard.press('Escape');await expect(page.locator('#cart')).not.toBeVisible();
 await page.reload();await expect(page.locator('[data-cart-count]')).toHaveText('3');await page.locator('[data-cart]').click();
 await page.locator('[data-remove="samsung-990-pro-2tb"]').click();await expect(page.locator('#cart-total')).toContainText('114,99');
 await page.locator('#clear-cart').click();await expect(page.locator('.empty-cart')).toBeVisible();await expect(page.locator('#cart-checkout')).not.toBeVisible();
});
test('static product and category pages work without JavaScript',async({browser},testInfo)=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:testInfo.project.use.viewport});const page=await context.newPage();
 for(const p of products){await page.goto('http://127.0.0.1:4173/productos/'+p.id+'/');await expect(page.locator('h1')).toHaveText(p.name);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://anyelopetit.github.io/naiguastore-codex/productos/'+p.id+'/');expect(await page.locator('img').evaluateAll(items=>items.every(i=>i.complete&&i.naturalWidth>0))).toBeTruthy();}
 await page.goto('http://127.0.0.1:4173/categorias/memoria-ram/');await expect(page.locator('[data-product]')).toHaveCount(1);
 await page.screenshot({path:testInfo.outputPath('category.png'),fullPage:true});await context.close();
});
test('corrupt stored cart is discarded and dialog keyboard focus stays inside',async({page})=>{
 await page.addInitScript(key=>localStorage.setItem(key,JSON.stringify([{id:'unknown',quantity:50},{id:'samsung-990-pro-2tb',quantity:-1}])),CART_KEY);
 await page.goto('/');await expect(page.locator('#result-count')).toContainText('4 productos');await expect(page.locator('[data-cart-count]')).toHaveText('0');
 await page.locator('[data-cart]').click();for(let i=0;i<8;i++)await page.keyboard.press('Tab');
 expect(await page.evaluate(()=>document.querySelector('#cart').contains(document.activeElement))).toBeTruthy();
 await page.keyboard.press('Escape');await expect(page.locator('[data-cart]')).toBeFocused();
});
