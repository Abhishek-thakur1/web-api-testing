//  The test runner is an experimental feature. This feature could change at any time....
// ref: https://nodejs.org/api/test.html

import test from 'node:test'
import assert from 'node:assert'
import {promisify} from 'node:util'

test('Cats integration test suite', async (t) => {
    const testPort = 6969

    // don't use it oftenly, it mutates the environment
    process.env.PORT = testPort
    const { server } = await import('../../src/index.js')
    const testServerUrl = `http://localhost:${testPort}/cats`
    await t.test('It should be a worthy 🐈', async (t) => {
        const data = {
            name: "orange-cat",
            age: 6,
            power: "Killed 10 dogs"
        }

        const request = await fetch(testServerUrl, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        assert.deepStrictEqual.get(
            request.headers.get('content-type'),
            'application/json'
        )

        assert.strictEqual(request.status, 201)

        const result = await request.json()

        assert.deepStrictEqual(
            result.success,
            'cat entered GOD Mode😧'
        )

        assert.ok(
            result.id.length > 25,
            'ID should be valid!'
        )
    })
    await promisify(server.close.bind(server))()
})