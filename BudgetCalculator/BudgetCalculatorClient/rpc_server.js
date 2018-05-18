#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'rpc_queue';

    ch.assertQueue(q, {
      durable: false
    });
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    ch.consume(q, function reply(msg) {
      var parameters = msg.content.toString();
      var parametersArray = parameters.split(",");

      if (parameters.indexOf('fibonnaci') !== -1) {
        console.log('fibonnaci');

      }
      var substring = "addMealBudget"
      if ("addMealBudget".indexOf(substring) !== -1) {
        
        const replyMsg = addMealBudget(parametersArray[1], parametersArray[2], parametersArray[3]);

        ch.sendToQueue(msg.properties.replyTo,
        new Buffer(replyMsg.toString()), {
        correlationId: msg.properties.correlationId
        });

        ch.ack(msg);
      }


    });
  });
});

function addMealBudget(numOfDays, numOfMeals, budgetPerMeal) {
  const totalBudget = (numOfDays * numOfMeals) * budgetPerMeal;
  return `Number of Days: ${numOfDays}\n` +
    `Number of Meals per Day: ${numOfMeals}\n` +
    `Budget per Meal: ${budgetPerMeal}\n euros` +
    `Total Meal Budget for ${numOfDays} days: ${totalBudget} euros`;
}