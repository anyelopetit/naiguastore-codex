import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {cleanCart,totalCents,messageFor,whatsappURL,MAX_QUANTITY} from '../assets/cart.mjs';
const products=JSON.parse(await readFile(new URL('../data/products.json',import.meta.url)));
test('untrusted persisted quantities cannot create invalid or unknown line items',()=>{
 assert.deepEqual(cleanCart(null,products),[]);
 assert.deepEqual(cleanCart([{id:'missing',quantity:1},{id:products[0].id,quantity:-1},{id:products[0].id,quantity:1.5},{id:products[1].id,quantity:3},{id:products[1].id,quantity:999}],products),[{id:products[1].id,quantity:MAX_QUANTITY}]);
});
test('integer totals preserve cents for a multi-item selection',()=>{
 const cart=[{id:'samsung-990-pro-2tb',quantity:2},{id:'corsair-vengeance-rgb-32gb',quantity:1}];
 assert.equal(totalCents(cart,products),45497);
});
test('WhatsApp preserves variants, quantities, accented text and unconfirmed charges',()=>{
 const cart=[{id:'samsung-990-pro-2tb',quantity:2}];
 const text=messageFor(cart,products,{name:'José & Ana',city:'La Guaira',delivery:'Envío nacional',notes:'¿M.2 NVMe?'});
 assert.match(text,/Cantidad: 2/);assert.match(text,/2 TB · M.2 2280/);assert.match(text,/Envío: por confirmar/);assert.match(text,/Importe final: por confirmar/);
 const url=new URL(whatsappURL(text));assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/584146380868');assert.equal(url.searchParams.get('text'),text);
 assert.throws(()=>messageFor([],products));
});
