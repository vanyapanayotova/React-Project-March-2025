export default function CommentsCreate({
    onCreate,
}) {
    return (
        <div className="col">
            <form className="form" action={onCreate}>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Add new comment</label>
                    <textarea className="form-control" name="comment" placeholder="Comment......"></textarea>
                </div>
                <div>
                    <input className="btn btn-primary" type="submit" value="Add Comment" />
                </div>
            </form>
        </div>
    );
}
