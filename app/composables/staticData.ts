export const useStaticData = () => {

    enum ColorMap {
        success = 'bg-green-500 text-white',
        info = 'bg-blue-500 text-white',
        warning = 'bg-yellow-500 text-white',
        danger = 'bg-red-500 text-white',
    }

    const mapToClass = (value: string) => {
        switch (value) {
            case 'success': return ColorMap.success;
            case 'info': return ColorMap.info;
            case 'warning': return ColorMap.warning;
            case 'danger': return ColorMap.danger;
            default: return ColorMap.info;
        }
    }

    onMounted(() => {
        console.log('onMounted: useStaticData called');
    })

    return {
        mapToClass,
    }
}