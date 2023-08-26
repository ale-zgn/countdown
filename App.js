import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import moment from 'moment';


export default function App() {
  const [timeLeft, setTimeLeft] = useState('');

  const calculateTimeLeft = () => {
    const now = moment();
    const events = [
      { name: 'Event 1', time: moment().day(1).hour(17).minute(0).second(0) }, // Monday 5:00 PM
      { name: 'Event 2', time: moment().day(4).hour(2).minute(37).second(0) }, // Thursday 2:37 AM
      { name: 'Event 3', time: moment().day(6).hour(14).minute(54).second(0) }, // Saturday 2:54 PM
    ];

    // Sort events by the closest one in the future
    events.sort((a, b) => {
      if (now.isAfter(a.time)) {
        a.time.add(1, 'week');
      }
      if (now.isAfter(b.time)) {
        b.time.add(1, 'week');
      }
      return a.time - b.time;
    });

    const nextEvent = events[0];
    const duration = moment.duration(nextEvent.time.diff(now));
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      days,
      hours,
      minutes,
      seconds,
      eventName: nextEvent.name,
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{timeLeft.eventName}</Text>
      <Text style={styles.time}>
        {timeLeft.days} day(s)
      </Text>
      <Text style={styles.time}>
        {timeLeft.hours} hour(s),
      </Text>
      <Text style={styles.time}>
        {timeLeft.minutes} minute(s) and
      </Text>
      <Text style={styles.time}>
        {timeLeft.seconds} second(s)
      </Text>


      <Text style={styles.remaining}>remaining</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
  eventName: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: "regular",
    margin: 15,
  },
  time: {
    fontSize: 45,
    textAlign: 'center',
    fontWeight: "bold",
    margin: 10,
    color: '#333',
  },
  remaining: {
    fontSize: 30,
    textAlign: 'center',
    margin: 15,
    color: '#666',
  },
});
