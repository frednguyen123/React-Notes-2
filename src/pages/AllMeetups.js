import { useState, useEffect } from 'react';
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_DATA = [
//     {
//       id: 'm1',
//       title: 'This is a first meetup',
//       image:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//       address: 'Meetupstreet 5, 12345 Meetup City',
//       description:
//         'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//     },
//     {
//       id: 'm2',
//       title: 'This is a second meetup',
//       image:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//       address: 'Meetupstreet 5, 12345 Meetup City',
//       description:
//         'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//     },
//   ];

function AllMeetupsPage(){
    // Destructure: First is current state, second is function that allows us to update the state
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);

    // First argument is a function, second argument is an array of dependencies
    // If array is changed then we would run the useEffect function again to fetch API
    useEffect(() => {
        setIsLoading(true)
        fetch(
            'https://react-getting-started-4d975-default-rtdb.firebaseio.com/meetups.json'
        ).then(response => {
           return response.json()
        }).then(data =>{
            const meetups = [];
            for (const key in data){
                const meetup = {
                    id: key,
                    ...data[key],
                }
                meetups.push(meetup);
            }
            setIsLoading(false);
            setLoadedMeetups(meetups);
        });
    }, []);


    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
    <section>
        <h1>All Meetups</h1>
        <MeetupList meetups={loadedMeetups}/>
        {/* {DUMMY_DATA.map((meetup) => {
            return <li key={meetup.id}>{meetup.title}</li>
        })} */}
    </section>
    );
}

export default AllMeetupsPage;