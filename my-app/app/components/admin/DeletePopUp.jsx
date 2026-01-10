

export default function DeleteProgramPopUp({ program, onCancel, onDelete , loading}) {


  return (
    <div className="fixed inset-0 bg-[#00000040] flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete <span className="font-bold">{program.name}</span>?
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete()}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            {loading ?'Deleting ...' :'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
