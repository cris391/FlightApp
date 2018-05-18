#!/usr/bin/env node

// Requirements
// start activemq server
// npm install amqplib
// usage in terminal: node rpc_client.js methodName parameter1 parameter2 ...
// example: node rpc_client.js addextrabudget 4 2

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js parameter1 parameter2 etc");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      var corr = generateUuid();
      var parameters = args;

      console.log('Requesting %s', parameters);

      ch.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == corr) {
          console.log(' [.] Got %s', msg.content.toString());
          setTimeout(function() { 
            conn.close(); 
            process.exit(0) 
          }, 500);
        }
      }, {noAck: true});

      ch.sendToQueue('rpc_queue',
      new Buffer(parameters.toString()),
      { correlationId: corr, replyTo: q.queue });
    });
  });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}