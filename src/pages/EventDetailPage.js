import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "./../components/EventItem";
import EventsList from "./../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  async function loadEvent(id) {
    if (!response.ok) {
      // return { isError: true, message: "Could not fetch events data" };
      // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      //   status: 500,
      // });
      throw json(
        { message: "Could not fetch events." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData.events;
    }
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could fetch delete event" },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
}
