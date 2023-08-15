import Link from 'next/link';

const getTickets = async () => {
  // revalidate 的概念要再熟悉
  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
};

const TicketList = async () => {
  const tickets = await getTickets();
  console.log(tickets);
  return (
    <>
      {tickets.map((ticket) => (
        <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
          <div className='card my-5'>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </div>
        </Link>
      ))}
      {tickets.length === 0 && (
        <p className='text-center'>There are no open ticket</p>
      )}
    </>
  );
};

export default TicketList;
