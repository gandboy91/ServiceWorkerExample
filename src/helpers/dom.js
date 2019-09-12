/**
 * make browser show prompt message on closing page
 * @param event
 */
export const preventLeaving = event => {
    event.preventDefault()
    event.returnValue = ''
}