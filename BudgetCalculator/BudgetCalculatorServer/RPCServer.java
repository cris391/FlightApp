// Requirements
// start activemq server
// have the following in the same folder: amqp-client.jar, slf4j-api.jar, slf4j-simple.jar RPCServer.java
// run: javac -cp amqp-client-4.0.2.jar RPCServer.java
// run: java -cp .:amqp-client-4.0.2.jar:slf4j-api-1.7.21.jar:slf4j-simple-1.7.22.jar RPCServer

import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Envelope;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import static java.lang.Integer.parseInt;

public class RPCServer {

    private static final String RPC_QUEUE_NAME = "rpc_queue";

    public static void main(String[] argv) {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        Connection connection = null;
        try {
            connection      = factory.newConnection();
            final Channel channel = connection.createChannel();

            channel.queueDeclare(RPC_QUEUE_NAME, false, false, false, null);

            channel.basicQos(1);

            System.out.println(" [x] Awaiting RPC requests");

            Consumer consumer = new DefaultConsumer(channel) {
                @Override
                public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                    AMQP.BasicProperties replyProps = new AMQP.BasicProperties
                            .Builder()
                            .correlationId(properties.getCorrelationId())
                            .build();

                    String response = "";
                    String message = new String(body,"UTF-8");
                    String[] messageArray = message.split(",");

                    if(message.toLowerCase().contains("addmealbudget")){

                        try {
                            response += addMealBudget(messageArray[1], messageArray[2], messageArray[3]);
                        }

                        catch (RuntimeException e){
                            System.out.println(" [.] " + e.toString());
                        }
                        finally {
                            channel.basicPublish( "", properties.getReplyTo(), replyProps, response.getBytes("UTF-8"));
                            channel.basicAck(envelope.getDeliveryTag(), false);
                            // RabbitMq consumer worker thread notifies the RPC server owner thread
                            synchronized(this) {
                                this.notify();
                            }
                        }
                    }
                    // @@@@@@@@@@@@@
                    if(message.toLowerCase().contains("addextrabudget")){

                        try {
                            response += addExtraBudget(messageArray[1], messageArray[2]);
                        }

                        catch (RuntimeException e){
                            System.out.println(" [.] " + e.toString());
                        }
                        finally {
                            channel.basicPublish( "", properties.getReplyTo(), replyProps, response.getBytes("UTF-8"));
                            channel.basicAck(envelope.getDeliveryTag(), false);
                            // RabbitMq consumer worker thread notifies the RPC server owner thread
                            synchronized(this) {
                                this.notify();
                            }
                        }
                    }
                    //@@@@@@@@@@
                    if(message.toLowerCase().contains("addhotelplane")){

                        try {
                            response += addHotelPlane(messageArray[1], messageArray[2]);
                        }

                        catch (RuntimeException e){
                            System.out.println(" [.] " + e.toString());
                        }
                        finally {
                            channel.basicPublish( "", properties.getReplyTo(), replyProps, response.getBytes("UTF-8"));
                            channel.basicAck(envelope.getDeliveryTag(), false);
                            // RabbitMq consumer worker thread notifies the RPC server owner thread
                            synchronized(this) {
                                this.notify();
                            }
                        }
                    }


                }
            };

            channel.basicConsume(RPC_QUEUE_NAME, false, consumer);
            // Wait and be prepared to consume the message from RPC client.
            while (true) {
                synchronized(consumer) {
                    try {
                        consumer.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
        }
        finally {
            if (connection != null)
                try {
                    connection.close();
                } catch (IOException _ignore) {}
        }
    }
    private static String addMealBudget(String numOfDays, String numOfMeals, String budgetPerMeal) {
        int numOfDaysInt = parseInt(numOfDays);
        int numOfMealsInt = parseInt(numOfMeals);
        int budgetPerMealInt = parseInt(budgetPerMeal);

        int totalBudgetInt = (numOfDaysInt * numOfMealsInt) * budgetPerMealInt;
        String totalBudgetString = String.valueOf(totalBudgetInt);

        return String.format(
                "Number of Days: %s\n"
                        + "Number of Meals per Day: %s\n"
                        + "Budget per Meal: %s euros\n"
                        + "Total Meal Budget for %s days: %s euros", numOfDays, numOfMeals, budgetPerMeal, numOfDays, totalBudgetString);
    }

    public static String addExtraBudget(String transportBudget, String emergencyBudget) {
        int transportBudgetInt = parseInt(transportBudget);
        int emergencyBudgetInt = parseInt(emergencyBudget);

        int totalBudget = transportBudgetInt + emergencyBudgetInt;
        String totalBudgetString = String.valueOf(totalBudget);

        return String.format(
                "Transportation Budget: %s euro\n"
                        + "Emergency Budget: %s euro\n"
                        + "Total Extra Budget: %s euro", transportBudget, emergencyBudget, totalBudgetString);
    }

    public static String addHotelPlane(String hotelPrice, String ticketPrice) {
        int hotelPriceInt = parseInt(hotelPrice);
        int ticketPriceInt = parseInt(ticketPrice);

        int totalPrice = hotelPriceInt + ticketPriceInt;
        String totalPriceString = String.valueOf(totalPrice);

        return String.format(
                "Total Hotel Payment: %s euro\n"
                        + "Plane Ticket Payment: %s euro\n"
                        + "Total Travel & Accomodation Payment: %s euro", hotelPrice, ticketPrice, totalPriceString
        );
    }
}
