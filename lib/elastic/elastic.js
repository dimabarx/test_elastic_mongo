const { Client } = require('@elastic/elasticsearch')

const {url} = require("../../lib/config/config_elastic");
const client = new Client({ node: url })

const elastic =  () => {

    return {

     createIndex : async (data) => {
        await client.index(
            {
            index: 'mywork',
            type: '_doc',
            body: data
                  })
        await client.indices.refresh({index: 'mywork'})
    },
        getIndex: async () => {
            // promise API
            const { body } = await client.search(
                {
                index: 'mywork',
                type:'_doc'

            })
            return body.hits.hits
        },
        getIndexQuery: async () => {
            // promise API
            const { body } = await client.search(
                {
                    index: 'mywork',
                    type:'_doc'

                })
            return body.hits.hits
        }
    }


}

module.exports = {
    elastic:elastic
}