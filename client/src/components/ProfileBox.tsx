export function ProfileBox({ type }: { type: string }) {
  return (
    <div className="w-full p-4">
      <h2 className="text-md mb-2">{type}</h2>
    </div>
  );
}

export default ProfileBox;