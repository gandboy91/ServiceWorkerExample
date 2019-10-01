export const selectQueue = ({ queue }) => Object.values(queue)

export const selectQueueSize = ({ queue }) => Object.keys(queue).length;
