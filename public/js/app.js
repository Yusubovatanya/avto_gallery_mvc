import { loadRoute, updateRoute } from './router.js';

window.addEventListener('load', loadRoute);
window.addEventListener('hashchange', updateRoute);
