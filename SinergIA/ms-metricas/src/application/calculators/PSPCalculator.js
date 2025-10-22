// PSPCalculator.js (Lógica de negocio pura - Independiente de BD)
export class PSPCalculator {
    /**
     * @param {number} totalLOC
     * @param {number} totalTimeHours
     * @returns {number} 
     */
    calculateProductivity(totalLOC, totalTimeHours) {
        if (totalTimeHours === 0) return 0;
        return parseFloat((totalLOC / totalTimeHours).toFixed(2));
    }

    /**
     * @param {number} totalDefects
     * @param {number} earlyDefects
     * @returns {number}
     */
    calculateDDE(totalDefects, earlyDefects) {
        if (totalDefects === 0) return 100;
        const dde = (earlyDefects / totalDefects) * 100;
        return parseFloat(dde.toFixed(2));
    }

    /**
     * @param {number} sizeEstimate
     * @param {number} historicProductivity
     * @returns {number}
     */
    estimateTime(sizeEstimate, historicProductivity) {
        if (historicProductivity === 0) return 9999;
        return parseFloat((sizeEstimate / historicProductivity).toFixed(2));
    }
}