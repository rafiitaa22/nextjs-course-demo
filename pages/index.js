import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return { props: { meetups: DUMMY_MEETUPS } };
// }

// se ejecuta en el pre-render process
// se ejecuta en el servidor, podemos validar accesos a DB, rutas del servidor,...
export async function getStaticProps() {
  //fetch data from an API/DB
  const client = await MongoClient.connect(
    "mongodb+srv://admin:IsLPRTCcp0SSDrvP@cluster0.38wvapm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }; //always an object! with props property and
  //another object, estas props son las que recibe el componente
}

export default HomePage;
