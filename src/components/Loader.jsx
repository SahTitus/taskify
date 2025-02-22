import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div>
      <div className={`flex justify-center items-center p-4`}>
        <div className={`w-3 h-3 bg-gray-700 rounded-full mx-1 ${styles["animate-spinner"]}`}></div>
        <div className={`w-3 h-3 bg-gray-700 rounded-full mx-1 ${styles["animate-spinner"]} ${styles["animate-delay-200"]}`}></div>
        <div className={`w-3 h-3 bg-gray-700 rounded-full mx-1 ${styles["animate-spinner"]} ${styles["animate-delay-400"]}`}></div>
        <div className={`w-3 h-3 bg-gray-700 rounded-full mx-1 ${styles["animate-spinner"]} ${styles["animate-delay-600"]}`}></div>
      </div>
    </div>
  );
};

export default Loader;