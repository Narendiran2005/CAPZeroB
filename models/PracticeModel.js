const expreess = require('express');
const router = expreess.Router();
const { getPool } = require('../config/db'); 
const createPracticeChallenge = async (user, fullData) => {

    const pool = getPool();
    try{
        const [result] = await pool.execute(
            "INSERT INTO practice (organization_id, title, description, points, difficulty, otherDetails, thumbnail_image, technical_diagram, stl_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user.id, fullData.title, fullData.description, parseInt(fullData.points), fullData.difficulty, fullData.otherDetails, fullData.thumbnailImage, fullData.technicalDiagram, fullData.stlFile]
        );



        

    }
    catch (error) {
        console.error('Error in createPracticeChallenge:', error);
        throw error;
    }
    
}

const managePractice = async (userId) => {
    const pool = getPool();
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM practice LEFT JOIN practice_data ON practice.id = practice_data.id WHERE practice.organization_id = ?",
            [userId]
        );

        
        if (rows.length === 0) {
            throw new Error('No practice challenges found for this organization');
        }
        return rows;
    } catch (error) {
        console.log('Error in managePractice:', error.message);
        console.error('Error in managePractice:', error);
        throw error;
    }

}

const getPractice = async (userId) => {
    const pool = getPool();
    try {
        const [rows] = await pool.execute(
            "SELECT practice.id, practice.title, practice_data.participants, practice.updated_at FROM practice LEFT JOIN practice_data ON practice.id = practice_data.id WHERE practice.organization_id = ?; ",
            [userId]
        );

        if (rows.length === 0) {
            throw new Error('No practice challenges found for this organization');
        }
        return rows;
    } catch (error) {
        console.log('Error in getPractice:', error.message);
        console.error('Error in getPractice:', error);
        throw error;
    }
}

module.exports = {
  createPracticeChallenge, managePractice, getPractice
};

