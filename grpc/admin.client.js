'use strict';

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync('./proto/admin.proto');
const adminProto = grpc.loadPackageDefinition(packageDefinition).admin;

const adminClient = new adminProto.AdminService(
  'localhost:5004',
  grpc.credentials.createInsecure()
);

export default adminClient;
