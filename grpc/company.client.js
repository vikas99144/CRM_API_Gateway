'use strict';

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync('./proto/company.proto');
const companyProto = grpc.loadPackageDefinition(packageDefinition).company;

const companyClient = new companyProto.CompanyService(
  'localhost:5005',
  grpc.credentials.createInsecure()
);

export default companyClient;
