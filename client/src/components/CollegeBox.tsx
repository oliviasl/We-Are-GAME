const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <button onClick={onDelete}>
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="9.5" r="9.5" fill="white"/>
      <line x1="6.55221" y1="6.49249" x2="12.6236" y2="13.0987" stroke="#7B2525" strokeWidth="1.5"/>
      <line x1="12.8017" y1="6.53141" x2="6.43809" y2="12.8691" stroke="#7B2525" strokeWidth="1.5"/>
    </svg>
  </button>
);

export function CollegeBox({ name, college_id, onDelete }: { name: string; college_id: number; onDelete: () => void}) {
  return (
    <div className="w-full px-5 py-3 mb-4 rounded-md bg-brand-gray-20 text-white flex justify-between items-center">
      <h2 className="text-md">{name}</h2>
      <DeleteButton onDelete={onDelete}/>
    </div>
  );
}

export default CollegeBox;