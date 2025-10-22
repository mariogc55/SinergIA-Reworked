// MongoMetricRepository.js (Implementa el Puerto - Adaptador de BD)
import { IMetricRepository } from "../../domain/ports/IMetricRepository";
import { TimeLogModel, DefectLogModel } from "../db/schemas";

export class MongoMetricRepository extends IMetricRepository {
    async saveTimeLog(timeLog) {
        const newLog = new TimeLogModel(timeLog);
        return newLog.save();
    }

    async saveDefectLog(defectLog) {
        const newLog = new DefectLogModel(defectLog);
        return newLog.save();
    }

    async findTimeLogsByDeveloper(developerId) {
        return TimeLogModel.find({ developerId }).exec();
    }

    async findDefectLogsByDeveloper(developerId) {
        return DefectLogModel.find({ developerId }).exec();
    }
}