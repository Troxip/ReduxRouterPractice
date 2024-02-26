import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Some Event",
  },
  {
    id: "e2",
    title: "Another Event",
  },
  {
    id: "e3",
    title: "Second Event 3",
  },
];

export default function EventsPage() {
  return (
    <>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id} title={event.title}>
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
