export function ProfileBox({ type }: { type: string }) {
  return (
    <div className="w-full py-4 px-8">
      <h2 className="text-lg font-bold mb-2">{type}</h2>
    </div>
  );
}