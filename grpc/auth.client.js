'use strict';

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync('./proto/admin.proto');
const authProto = grpc.loadPackageDefinition(packageDefinition).admin;

const authClient = new authProto.AdminService(
  'localhost:5000',
  grpc.credentials.createInsecure()
);

export default authClient;
