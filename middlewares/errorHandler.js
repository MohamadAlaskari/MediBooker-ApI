// Eine Middleware für die zentrale Fehlerbehandlung

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Protokolliert den Fehler-Stack-Trace zur Fehlerdiagnose

    // Sendet eine JSON-Antwort mit dem Fehlerstatus und der Fehlermeldung
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',

        // Im Entwicklungsmodus senden wir die detaillierten Fehlerinformationen
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = errorHandler;
