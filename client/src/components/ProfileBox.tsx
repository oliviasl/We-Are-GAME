export function ProfileBox({type, data}: { type: string; data: string | string[] }) {
  return (
    <div className="w-full p-4">
      <h2 className="text-md mb-2">{type}</h2>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(data)
          ? data.map((item, index) => (
            <div key={index} className="bg-brand-blue-95 rounded-md p-2">
              {item}
            </div>
          )
        ) : (
          <div className="bg-brand-blue-95 rounded-md p-2">
            {data}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileBox;