import logo from './logo.svg';
import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventId, setEventId] = useState(null); // State to store event ID

  const session = useSession(); // tokens
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function createCalendarEvent() {
    console.log("Creating a Calendar event");
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    console.log("Event Data:", event);

    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + session.provider_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    }).then((response) => {
      console.log("Response Status:", response.status);
      return response.json();
    }).then((data) => {
      console.log("Response Data:", data);
      if (data.id) {
        setEventId(data.id); // Store event ID
        alert("Event created, check your Google Calendar!");
      } else {
        alert("Error creating event, check console for details");
      }
    }).catch((error) => {
      console.log("Fetch Error:", error);
      alert("Error creating event, check console for details");
    });
  }

  async function deleteCalendarEvent() {
    if (!eventId) {
      alert("No event to delete");
      return;
    }

    console.log("Deleting Calendar event with ID:", eventId);

    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + session.provider_token
      }
    }).then((response) => {
      console.log("Response Status:", response.status);
      if (response.status === 204) {
        alert("Event deleted successfully");
        setEventId(null); // Clear event ID
      } else {
        alert("Error deleting event, check console for details");
      }
    }).catch((error) => {
      console.log("Fetch Error:", error);
      alert("Error deleting event, check console for details");
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);
  console.log(eventId);

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {session ? (
          <>
            <h2>Hey there {session.user.email}</h2>
            <p>Start of your event</p>
            <DateTimePicker onChange={(value) => { setStart(value); console.log("Start Date:", value); }} value={start} />
            <p>End of your event</p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p>Event name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event Description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>
            <button onClick={() => deleteCalendarEvent()}>Delete Calendar Event</button>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => googleSignIn()}>Sign in with Google</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
