import Vue from 'vue';
import _ from 'lodash';
import { uuid } from '@/utils/utils';
import { fetchAll, updateOne, deleteOne, createOne } from '@/api/api';

export const filterOpitons = {
    all: 'all',
    finished: 'finished',
    started: 'started',
    progress: 'progress',
};

export const store = {
    isFormDisplayed: false,
    user: {},
    activities: {},
    categories: {},
    fetchingActivities: false,
    fetchingActivitiesError: null,
    filterBy: 'all',
    errorMessages: {},
};

const errorMes = (err, field) => {
    return err.message === 'Network Error'
        ? 'please check network connection'
        : 'some thing went wrong could not ' + field;
};

export const mututions = {
    toggleFormDisplay(val) {
        if (typeof val === 'boolean') store.isFormDisplayed = val;
        else store.isFormDisplayed = !store.isFormDisplayed;
    },

    removeErrorMessage(fieldName) {
        setTimeout(() => {
            store.errorMessages = _.omit(store.errorMessages, fieldName);
        }, 4000);
    },

    setErrorMessage(field, err) {
        const errMsg = errorMes(err, field);
        Vue.set(store.errorMessages, _.camelCase(field), errMsg);
        this.removeErrorMessage(_.camelCase(field));
    },

    async createActivity(newActivity) {
        const id = uuid();
        const now = Date.now();
        try {
            const res = await createOne('activities', {
                id,
                ...newActivity,
                progress: 0,
                createdAt: now,
                updatedAt: now,
            });
            Vue.set(store.activities, res.data.id, res.data);
            return res;
        } catch (err) {
            this.setErrorMessage('create activity', err);
        }
    },
    async deleteActivity(activitieId) {
        try {
            await deleteOne(`activities/${activitieId}`);
            store.activities = _.omit(store.activities, activitieId);
        } catch (err) {
            this.setErrorMessage('delete activity', err);
        }
    },
    async updateActivity(activitieId, data) {
        try {
            const res = await updateOne(`activities/${activitieId}`, data);
            store.activities = _.assign(store.activities, {
                [activitieId]: res.data,
            });
            return res;
        } catch (err) {
            this.setErrorMessage('update activity', err);
        }
    },
    async fetchActivity() {
        store.fetchingActivities = true;
        store.fetchingActivitiesError = null;
        try {
            const res = await fetchAll('activities');
            store.activities = _.keyBy(res.data, 'id');
        } catch (err) {
            store.fetchingActivitiesError = errorMes(err, 'fetch activities');
        } finally {
            store.fetchingActivities = false;
        }
    },
    async fetchUser() {
        try {
            const res = await fetchAll('user');
            store.user = res.data;
        } catch (err) {
            this.setErrorMessage('fetch user', err);
        }
    },
    async fetchCategories() {
        try {
            const res = await fetchAll('categories');
            store.categories = _.keyBy(res.data, 'id');
        } catch (err) {
            this.setErrorMessage('fetch categories', err);
        }
    },
};
