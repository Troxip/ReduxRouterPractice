import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return <EventForm />;
}

export async function action({ request, params }) {
  const data = request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}
