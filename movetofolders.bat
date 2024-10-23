@echo off

:: Create backend folders and subfolders
mkdir backend\api-gateway\controllers
mkdir backend\api-gateway\load-balancer
mkdir backend\api-gateway\middlewares
mkdir backend\api-gateway\proxy
mkdir backend\api-gateway\routes
mkdir backend\core\auth
mkdir backend\core\config
mkdir backend\core\database\migrations
mkdir backend\core\middlewares
mkdir backend\core\services
mkdir backend\core\utils
mkdir backend\devops\ci-cd
mkdir backend\devops\docker
mkdir backend\devops\kubernetes
mkdir backend\devops\monitoring\grafana
mkdir backend\devops\monitoring
mkdir backend\devops\terraform
mkdir backend\docs\api-docs
mkdir backend\docs\architecture
mkdir backend\i18n
mkdir backend\microservices\business\controllers
mkdir backend\microservices\business\models
mkdir backend\microservices\business\routes
mkdir backend\microservices\business\services
mkdir backend\microservices\business\tests
mkdir backend\microservices\education\controllers
mkdir backend\microservices\education\models
mkdir backend\microservices\education\routes
mkdir backend\microservices\education\services
mkdir backend\microservices\education\tests
mkdir backend\microservices\government\controllers
mkdir backend\microservices\government\models
mkdir backend\microservices\government\routes
mkdir backend\microservices\government\services
mkdir backend\microservices\government\tests
mkdir backend\microservices\healthcare\controllers
mkdir backend\microservices\healthcare\models
mkdir backend\microservices\healthcare\routes
mkdir backend\microservices\healthcare\services
mkdir backend\microservices\healthcare\tests
mkdir backend\mobile
mkdir backend\monitoring\analytics
mkdir backend\monitoring\distributed-tracing
mkdir backend\monitoring\elk-stack
mkdir backend\public
mkdir backend\realtime-services\events\emitters
mkdir backend\realtime-services\events\listeners
mkdir backend\realtime-services\message-queue
mkdir backend\realtime-services\pub-sub
mkdir backend\realtime-services\sockets
mkdir backend\security\audit-logs
mkdir backend\security
mkdir backend\user-preferences

:: Create frontend folders and subfolders
mkdir frontend\config
mkdir frontend\public
mkdir frontend\src\assets\fonts
mkdir frontend\src\assets\media
mkdir frontend\src\assets\styles
mkdir frontend\src\assets\themes
mkdir frontend\src\components\common
mkdir frontend\src\components\forms
mkdir frontend\src\components\layout
mkdir frontend\src\components\specific
mkdir frontend\src\containers\404
mkdir frontend\src\containers\Dashboard
mkdir frontend\src\containers\Login
mkdir frontend\src\containers\Settings
mkdir frontend\src\containers\UserProfile
mkdir frontend\src\contexts
mkdir frontend\src\hooks
mkdir frontend\src\i18n
mkdir frontend\src\routes
mkdir frontend\src\services
mkdir frontend\src\store\actions
mkdir frontend\src\store\reducers
mkdir frontend\src\store
mkdir frontend\src\utils
mkdir frontend\src\views\About
mkdir frontend\src\views\Contact
mkdir frontend\src\views\Home
mkdir frontend\src\views\Legal
mkdir frontend\tests\e2e
mkdir frontend\tests\integration
mkdir frontend\tests\unit

:: Move files to their respective locations in backend
move apiController.js backend\api-gateway\controllers
move roundRobin.js backend\api-gateway\load-balancer
move authMiddleware.js backend\api-gateway\middlewares
move inputValidator.js backend\api-gateway\middlewares
move rateLimiter.js backend\api-gateway\middlewares
move proxyConfig.js backend\api-gateway\proxy
move proxyHandler.js backend\api-gateway\proxy
move proxyRules.js backend\api-gateway\proxy
move apiRoutes.js backend\api-gateway\routes
move authController.js backend\core\auth
move authMiddleware.js backend\core\auth
move authService.js backend\core\auth
move permissions.js backend\core\auth
move envConfig.js backend\core\config
move loggingConfig.js backend\core\config
move secrets.js backend\core\config
move securityConfig.js backend\core\config
move connection.js backend\core\database
move dbSeeding.js backend\core\database
move 001_create_users_table.js backend\core\database\migrations
move 002_create_roles_table.js backend\core\database\migrations
move 003_create_permissions_table.js backend\core\database\migrations
move index.js backend\core
move errorMiddleware.js backend\core\middlewares
move loggingMiddleware.js backend\core\middlewares
move securityMiddleware.js backend\core\middlewares
move backupService.js backend\core\services
move cacheService.js backend\core\services
move emailService.js backend\core\services
move notificationService.js backend\core\services
move encryption.js backend\core\utils
move fileUploadUtils.js backend\core\utils
move formatters.js backend\core\utils
move validators.js backend\core\utils
move github-actions.yml backend\devops\ci-cd
move jenkinsfile backend\devops\ci-cd
move docker-compose.yml backend\devops\docker
move Dockerfile backend\devops\docker
move autoscale.yml backend\devops\kubernetes
move deployment.yml backend\devops\kubernetes
move service.yml backend\devops\kubernetes
move alertmanager.yml backend\devops\monitoring
move apiUsageDashboard.json backend\devops\monitoring\grafana
move dashboardConfig.json backend\devops\monitoring\grafana
move systemPerformanceDashboard.json backend\devops\monitoring\grafana
move userActivityDashboard.json backend\devops\monitoring\grafana
move logCollection.yml backend\devops\monitoring
move prometheus.yml backend\devops\monitoring
move main.tf backend\devops\terraform
move network.tf backend\devops\terraform
move security.tf backend\devops\terraform
move swagger.yaml backend\docs\api-docs
move architectureDiagram.png backend\docs\architecture
move README.md backend\docs
move i18nMiddleware.js backend\i18n
move languageConfig.js backend\i18n
move crmController.js backend\microservices\business\controllers
move inventoryController.js backend\microservices\business\controllers
move clientModel.js backend\microservices\business\models
move orderModel.js backend\microservices\business\models
move productModel.js backend\microservices\business\models
move businessRoutes.js backend\microservices\business\routes
move inventoryManagementService.js backend\microservices\business\services
move salesService.js backend\microservices\business\services
move crmTests.js backend\microservices\business\tests
move inventoryTests.js backend\microservices\business\tests
move courseController.js backend\microservices\education\controllers
move studentController.js backend\microservices\education\controllers
move courseModel.js backend\microservices\education\models
move studentModel.js backend\microservices\education\models
move teacherModel.js backend\microservices\education\models
move educationRoutes.js backend\microservices\education\routes
move enrollmentService.js backend\microservices\education\services
move gradeService.js backend\microservices\education\services
move courseTests.js backend\microservices\education\tests
move studentTests.js backend\microservices\education\tests
move citizenController.js backend\microservices\government\controllers
move taxController.js backend\microservices\government\controllers
move citizenModel.js backend\microservices\government\models
move taxModel.js backend\microservices\government\models
move governmentRoutes.js backend\microservices\government\routes
move taxCalculationService.js backend\microservices\government\services
move voterRegistrationService.js backend\microservices\government\services
move citizenTests.js backend\microservices\government\tests
move taxTests.js backend\microservices\government\tests
move appointmentController.js backend\microservices\healthcare\controllers
move patientController.js backend\microservices\healthcare\controllers
move appointmentModel.js backend\microservices\healthcare\models
move doctorModel.js backend\microservices\healthcare\models
move patientModel.js backend\microservices\healthcare\models
move healthcareRoutes.js backend\microservices\healthcare\routes
move appointmentService.js backend\microservices\healthcare\services
move medicalRecordService.js backend\microservices\healthcare\services
move appointmentTests.js backend\microservices\healthcare\tests
move patientTests.js backend\microservices\healthcare\tests
move mobileRoutes.js backend\mobile
move mobileServices.js backend\mobile
move pushNotifications.js backend\mobile
move systemLogs.js backend\monitoring\analytics
move usageReports.js backend\monitoring\analytics
move userAnalytics.js backend\monitoring\analytics
move jaeger.yml backend\monitoring\distributed-tracing
move opentelemetry.yml backend\monitoring\distributed-tracing
move elasticsearch.yml backend\monitoring\elk-stack
move kibana.yml backend\monitoring\elk-stack
move logstash.conf backend\monitoring\elk-stack
move favicon.ico backend\public
move eventEmitter.js backend\realtime-services\events\emitters
move notificationEventEmitter.js backend\realtime-services\events\emitters
move systemEventEmitter.js backend\realtime-services\events\emitters
move voteEventEmitter.js backend\realtime-services\events\emitters
move eventListener.js backend\realtime-services\events\listeners
move notificationEventListener.js backend\realtime-services\events\listeners
move systemEventListener.js backend\realtime-services\events\listeners
move voteEventListener.js backend\realtime-services\events\listeners
move queueProcessor.js backend\realtime-services\message-queue
move votePub.js backend\realtime-services\pub-sub
move voteSub.js backend\realtime-services\pub-sub
move notificationSocket.js backend\realtime-services\sockets
move voteSocket.js backend\realtime-services\sockets
move accessLog.js backend\security\audit-logs
move auditLogProcessor.js backend\security\audit-logs
move changeLog.js backend\security\audit-logs
move securityLog.js backend\security\audit-logs
move authKeys.js backend\security
move dataRetention.js backend\security
move csrfProtection.js backend\security
move encryption.js backend\security
move preferencesController.js backend\user-preferences
move preferencesModel.js backend\user-preferences
move preferencesRoutes.js backend\user-preferences

:: Move files to their respective locations in frontend
move babel.config.js frontend\config
move env.development frontend\config
move env.production frontend\config
move env.test frontend\config
move webpack.config.js frontend\config
move package.json frontend
move favicon.ico frontend\public
move index.html frontend\public
move App.js frontend\src
move font1.woff frontend\src\assets\fonts
move font2.woff frontend\src\assets\fonts
move background-video.mp4 frontend\src\assets\media
move global.css frontend\src\assets\styles
move theme.css frontend\src\assets\styles
move dark-theme.css frontend\src\assets\themes
move light-theme.css frontend\src\assets\themes
move Button.js frontend\src\components\common
move Input.js frontend\src\components\common
move Modal.js frontend\src\components\common
move LoginForm.js frontend\src\components\forms
move RegistrationForm.js frontend\src\components\forms
move Footer.js frontend\src\components\layout
move Header.js frontend\src\components\layout
move Sidebar.js frontend\src\components\layout
move Chart.js frontend\src\components\specific
move Table.js frontend\src\components\specific
move NotFound.js frontend\src\containers\404
move Dashboard.js frontend\src\containers\Dashboard
move Login.js frontend\src\containers\Login
move Settings.js frontend\src\containers\Settings
move UserProfile.js frontend\src\containers\UserProfile
move AuthContext.js frontend\src\contexts
move LanguageContext.js frontend\src\contexts
move ThemeContext.js frontend\src\contexts
move useAuth.js frontend\src\hooks
move useFetch.js frontend\src\hooks
move useSocket.js frontend\src\hooks
move en.json frontend\src\i18n
move es.json frontend\src\i18n
move fr.json frontend\src\i18n
move i18n.js frontend\src\i18n
move index.js frontend\src
move AppRoutes.js frontend\src\routes
move PrivateRoute.js frontend\src\routes
move api.js frontend\src\services
move authService.js frontend\src\services
move localizationService.js frontend\src\services
move notificationService.js frontend\src\services
move userService.js frontend\src\services
move serviceWorker.js frontend\src
move setupTests.js frontend\src
move authActions.js frontend\src\store\actions
move userActions.js frontend\src\store\actions
move authReducer.js frontend\src\store\reducers
move settingsReducer.js frontend\src\store\reducers
move userReducer.js frontend\src\store\reducers
move rootReducer.js frontend\src\store
move store.js frontend\src\store
move dateUtils.js frontend\src\utils
move fileUpload.js frontend\src\utils
move validation.js frontend\src\utils
move AboutView.js frontend\src\views\About
move ContactView.js frontend\src\views\Contact
move HomeView.js frontend\src\views\Home
move LegalView.js frontend\src\views\Legal
move AuthenticationFlow.test.js frontend\tests\e2e
move UserSettingsFlow.test.js frontend\tests\e2e
move DashboardView.test.js frontend\tests\integration
move LoginView.test.js frontend\tests\integration
move authReducer.test.js frontend\tests\unit
move store.test.js frontend\tests\unit
move userReducer.test.js frontend\tests\unit

echo All folders created and files moved successfully.
