
'use strict';

import grpc from '@grpc/grpc-js';
import adminClient from '../grpc/admin.client.js';


const buildMetadata = (req) => {
    const metadata = new grpc.Metadata();

    if (req.user) {
        metadata.set('x-user-id', String(req.user.id));
        metadata.set('x-user-role', String(req.user.role));
    }

    if (req.requestId) {
        metadata.set('x-request-id', String(req.requestId));
    }

    return metadata;
};


const auth = (req, res) => {

    let metadata = buildMetadata(req);

    adminClient.GetAdmin(
        { id: req.params.id },
        metadata,
        (err, response) => {

            if (err) {
                return res.status(500).json({
                    error: err.message,
                    requestId: req.requestId
                });
            }

            res.json({
                requestId: req.requestId,
                data: response
            });
        }
    );
}


export {
    auth
};
