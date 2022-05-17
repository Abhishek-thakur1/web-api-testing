import { parse } from 'node:url'
import { routes } from './routes/catRoute.js';
import { DEFAULT_HEADER } from './util/util.js'

const catRoute = routes({
    catService: {}
})

function handler(req, res) {

    const allRoutes = {
        ...catRoute, 
        // 404
        default: (req, res) => {
            res.writeHead(404, DEFAULT_HEADER);
            res.write('404 Not Found')
            res.end()
        }
    }
    const { url, method } = req
    const {pathname} = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}` 
    const chosen = allRoutes[key] || allRoutes.default
    return Promise.resolve(chosen(req, res)).catch(errorHandler(res))
};

// error handler..
function errorHandler(res) {
    return err => {
        console.log('OOPS! Something bad happened🔻', err.stack)
        res.writeHead(500, DEFAULT_HEADER)
        res.write(JSON.stringify({
            err: 'Error happened our side, so you need not to worry🖕'
        }))

        return res.end()    
    }
}

export default handler