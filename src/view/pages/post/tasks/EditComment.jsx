const EditComment = ({ currentComment, setEditComment }) => {
  return (
    <div className="absolute h-screen items-center flex w-full z-[999px]">
      {JSON.stringify(currentComment)}
      <button onClick={() => setEditComment(false)}>close</button>
    </div>
  );
};

export default EditComment;
