import axios from 'axios';

export default ({ url, method, body, onSuccess, setErrors }) => {

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios[method](url, {
                ...body,
                ...props,
            }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            setErrors(
                <div className="text-red-700" role="alert">
                    <strong className="font-medium">Alert!</strong>
                    <span className="block sm:inline">
                        <ul className='my-0 font-medium'>
                            {err.response.data.errors.map((err) => (
                                <li key={err.message}>{err.message}</li>
                            ))}
                        </ul>
                    </span>
                </div>
            );
        }
    };

    return { doRequest };
};