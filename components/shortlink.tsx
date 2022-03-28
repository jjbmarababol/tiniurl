interface Link {
    destination: string;
    shortlink: string;
}

export default function Shortlink ({ destination, shortlink}: Link) {
    return (<div>
        <a href={destination}>{shortlink}</a>
    </div>);
}