import { parse } from 'node:url'
import {DEFAULT_HEADER} from './util/util.js'

function handler(req, res) {

    const allRoutes = {
        '/cats:get': (req, res) => {
            res.write('GET')
            res.end()
        },

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
    return chosen(req, res)
};

export default handler