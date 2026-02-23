
'use strict';

import grpc from '@grpc/grpc-js';
import adminClient from '../grpc/admin.client.js';
import { rpcDeadLine } from "../../../helpers/index.js";
import { grpcPolicy } from '../../../middlewares/circuitbreaker.middelware.js';






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


const auth = async (req, res) => {

    try {
        let metadata = buildMetadata(req);
        const response = await grpcPolicy.execute(() =>
            new Promise((resolve, reject) => {
                adminClient.GetAdmin(
                    { id: req.params.id },
                    metadata,
                    { rpcDeadLine },
                    (err, response) => {

                        if (err) {
                            reject(err);
                        }

                        res.json({
                            requestId: req.requestId,
                            data: response
                        });
                    }
                );
            })
        );

    } catch (error) {

        if (error.code === grpc.status.DEADLINE_EXCEEDED) {
            return res.status(504).json({
                message: 'User service timeout (Deadline Exceeded)'
            });
        }

        if (error.code === 'EOPENBREAKER') {
            return res.status(503).json({
                message: 'Service temporarily unavailable (Circuit Open)'
            });
        }

        res.status(500).json({
            message: 'User service failed',
            error: error.message
        });
    }


}


export {
    auth
};
