const { app } = require('@azure/functions');

app.http('ProcessDocument', {
    methods: ['GET', 'POST'],
    authLevel: 'function',

    handler: async (request, context) => {

        context.log('Processing document request');

        // get parameters
        const fileName = request.query.get('fileName') || await request.text();
        const fileSize = request.query.get('fileSize');

        if (!fileName) {
            return {
                status: 400,
                body: "Missing fileName parameter"
            };
        }

        const result = {
            fileName: fileName,
            fileSize: fileSize,
            processedTime: new Date().toISOString(),
            status: "Document processed successfully"
        };

        return {
            status: 200,
            jsonBody: result
        };
    }
});

