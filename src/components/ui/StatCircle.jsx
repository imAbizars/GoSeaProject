import * as motion from "motion/react-client";
import CountUp from "./CountDataAbout";

export default function StatCircle({ label, value, suffix = "", delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="bg-background text-white w-28 h-26 rounded-full flex flex-col items-center justify-center"
        >
            <h2 className="text-2xl font-bold font-heading">
                <CountUp value={value} suffix={suffix} />
            </h2>
            <p className="text-md font-body">{label}</p>
        </motion.div>
    );
}