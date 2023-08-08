import Avatar from "./avatar";

export default function PostComponent({ theme, post }) {
    const time = new Date(post.time);

    return <div className="chat chat-start">
        <Avatar className="chat-image mr-1" image={post.authorAvatar} theme={theme}/>
        <div className="chat-header">
            <span className="text-accent">{post.authorName}</span>
            <time> / {time.toTimeString()} / {time.toDateString()}</time>
        </div>
        <div className="chat-bubble">{post.text}</div>
    </div>
}