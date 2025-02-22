import { EmptyTasks } from "./EmptyTasks";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  hasMore,
  lastElementRef,
  toggleForm,
  handleOnEditClick,
  deleteTask,
  toggleCheckTask,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Show empty state */}
      {tasks?.length === 0 ? (
        <EmptyTasks toggleForm={toggleForm} />
      ) : (
        <>
          {/* Render tasks with infinite scroll */}
          {tasks?.map((task, index) => {
            if (tasks.length === index + 1) {
              return (
                <div key={task.id} ref={lastElementRef}>
                  <TaskItem
                    task={task}
                    deleteTask={deleteTask}
                    toggleCheckTask={toggleCheckTask}
                    handleOnEditClick={handleOnEditClick}
                  />
                </div>
              );
            }
            return (
              <TaskItem
                task={task}
                key={task.id}
                deleteTask={deleteTask}
                toggleCheckTask={toggleCheckTask}
                handleOnEditClick={handleOnEditClick}
              />
            );
          })}

          {/* Show loading spinner */}
          {hasMore && isLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
