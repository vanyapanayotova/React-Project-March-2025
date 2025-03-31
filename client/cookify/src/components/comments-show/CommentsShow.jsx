export default function CommentsView({
    comments,
}) {
    return (
        <>
            <div className="col">
                <hr className="mt-4" />
                <h2>Comments:</h2>
                {comments.length > 0
                    ? comments.map(({ _id, comment, pending, author }) => (
                        <div key={_id} className={`alert ${pending ? 'alert-info' : 'alert-dark'}`} role="alert">
                            <strong>{author.email}:</strong> {comment}
                        </div>
                    ))
                    : <p className="no-comment">No comments.</p>
                }
            </div>
        </>
    );
}
