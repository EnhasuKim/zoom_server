import express from 'express';
import { School } from '../types/school';

const router = express.Router();

const data = [
    {
        id: 1,
        name: '동북고',
    },
];
router.get('/', (req, res) => {
    const { name } = req.query;
    const result = [];
    if (name) {
        const filtered = data.filter((school: School) => school.name === name);
        result.push(...filtered);
    } else {
        result.push(...data);
    }
    return res.status(200).json(result);
});
router.get('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json();
    }
    const schoolIdNumber: number = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }


    const filtered = data.filter((item: School) => item.id === schoolIdNumber);
    return res.status(200).json(filtered[0]);
});

router.post('/', (req, res) => {
    const { name } = req.body as { name: string };
    if (!name) {
        return res.status(400).json();
    }

    /*
    data:School[]
    const school:School = req.body as School;
    let maxId = 0;
    for(const item of data) {
        if(item.id > maxId) maxId = item.id;
    }
    data.push({
        id:maxId+1,
        name,
    });
    */

    const newId: number = Math.max(...data.map((item: School) => item.id)) + 1;
    const school: School = {
        name,
        id: newId,
    };
    data.push(school);
    return res.status(201).json();
});
router.put('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json();
    }
    const schoolIdNumber: number = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }
    const school: School = req.body as School;
    if (school.id !== schoolIdNumber) {
        return res.status(400).json();
    }
    const index: number = data.findIndex((existSchool: School) => existSchool.id === schoolIdNumber);
    data[index] = school;
    return res.status(200).json();
});
router.delete('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json();
    }
    const schoolIdNumber: number = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }

    const index: number = data.findIndex((school: School) => school.id === schoolIdNumber)
    data.splice(index, 1);
    return res.status(200).json();
})

export default router;