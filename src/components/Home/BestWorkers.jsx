import { motion } from "framer-motion";
import workers from "../../data/workers";


const BestWorkers = () => {
  return (
    <section className="py-16 bg-green-200">
      <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
    Top Workers ⭐
             </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {workers.slice(0, 6).map((worker, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-pink-200 rounded-lg text-center shadow"
          >
            <img
              src={worker.photo}
              className="w-20 h-20 mx-auto rounded-full"
            />
            <h3 className="mt-3 font-semibold">{worker.name}</h3>
            <p className="text-indigo-600 font-bold">
              💰 {worker.coins} Coins
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestWorkers;
