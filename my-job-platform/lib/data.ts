export type Level = "Junior" | "Mid" | "Senior";

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
  requiredSkills: Record<string, Level>; // skillId -> min level
};

export const ALL_SKILLS: Skill[] = [
  // 1. 数学与算法基础 (Math & Foundations)
  { id: "lie-group-algebra", name: "李群与李代数 (Lie Group/Algebra)", category: "数学与算法基础 (Math & Foundations)" },
  { id: "quaternions", name: "四元数 (Quaternions)", category: "数学与算法基础 (Math & Foundations)" },
  { id: "bayesian-filter", name: "贝叶斯滤波 (Kalman/Particle Filter)", category: "数学与算法基础 (Math & Foundations)" },
  { id: "convex-optimization", name: "凸优化 (Convex Optimization)", category: "数学与算法基础 (Math & Foundations)" },
  { id: "graph-theory", name: "图论 (Graph Theory)", category: "数学与算法基础 (Math & Foundations)" },
  { id: "linear-algebra", name: "线性代数", category: "数学与算法基础 (Math & Foundations)" },
  { id: "probability", name: "概率论", category: "数学与算法基础 (Math & Foundations)" },

  // 2. 运动控制与驱动 (Motor & Control)
  { id: "pid-control", name: "PID控制", category: "运动控制与驱动 (Motor & Control)" },
  { id: "foc", name: "FOC (磁场定向控制)", category: "运动控制与驱动 (Motor & Control)" },
  { id: "mpc", name: "MPC (模型预测控制)", category: "运动控制与驱动 (Motor & Control)" },
  { id: "wbc", name: "WBC (全身控制)", category: "运动控制与驱动 (Motor & Control)" },
  { id: "lqr", name: "LQR", category: "运动控制与驱动 (Motor & Control)" },
  { id: "impedance-control", name: "阻抗控制 (Impedance Control)", category: "运动控制与驱动 (Motor & Control)" },
  { id: "stepper-motor", name: "步进电机", category: "运动控制与驱动 (Motor & Control)" },
  { id: "bldc", name: "BLDC", category: "运动控制与驱动 (Motor & Control)" },
  { id: "servo-drive", name: "伺服驱动器 (Elmo/Copley/ODrive)", category: "运动控制与驱动 (Motor & Control)" },

  // 3. 硬件与嵌入式 (Embedded & Hardware)
  { id: "stm32", name: "STM32", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "esp32", name: "ESP32", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "fpga", name: "FPGA (Verilog/Vivado)", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "arm-cortex-m", name: "ARM Cortex-M", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "rtos", name: "RTOS (FreeRTOS/RT-Thread)", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "arduino", name: "Arduino", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "raspberry-pi", name: "Raspberry Pi", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "jetson-orin", name: "Jetson Orin", category: "硬件与嵌入式 (Embedded & Hardware)" },
  { id: "plc", name: "PLC", category: "硬件与嵌入式 (Embedded & Hardware)" },

  // 4. 电子电气与电路 (Electronics & PCB)
  { id: "altium-designer", name: "Altium Designer (AD)", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "kicad", name: "KiCad", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "cadence", name: "Cadence", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "schematic-design", name: "原理图设计", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "multilayer-pcb", name: "多层PCB Layout", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "signal-integrity", name: "信号完整性 (SI)", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "oscilloscope-debug", name: "示波器调试", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "soldering", name: "焊接", category: "电子电气与电路 (Electronics & PCB)" },
  { id: "wire-harness", name: "线束设计", category: "电子电气与电路 (Electronics & PCB)" },

  // 5. 通讯协议 (Communication Protocols)
  { id: "can", name: "CAN / CAN FD", category: "通讯协议 (Communication Protocols)" },
  { id: "ethercat", name: "EtherCAT (实时以太网)", category: "通讯协议 (Communication Protocols)" },
  { id: "rs485-232", name: "RS485/232", category: "通讯协议 (Communication Protocols)" },
  { id: "i2c", name: "I2C", category: "通讯协议 (Communication Protocols)" },
  { id: "spi", name: "SPI", category: "通讯协议 (Communication Protocols)" },
  { id: "uart", name: "UART", category: "通讯协议 (Communication Protocols)" },
  { id: "tcp-ip", name: "TCP/IP", category: "通讯协议 (Communication Protocols)" },
  { id: "mqtt", name: "MQTT", category: "通讯协议 (Communication Protocols)" },
  { id: "dds", name: "DDS (Data Distribution Service)", category: "通讯协议 (Communication Protocols)" },
  { id: "modbus", name: "Modbus", category: "通讯协议 (Communication Protocols)" },

  // 6. 机械结构与仿真 (Mechanical & Simulation)
  { id: "solidworks", name: "SolidWorks", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "fusion-360", name: "Fusion 360", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "catia", name: "CATIA", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "ansys", name: "ANSYS (有限元分析)", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "structure-design", name: "结构设计", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "transmission-design", name: "传动设计 (齿轮/谐波减速机)", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "3d-printing", name: "3D打印", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "cnc", name: "CNC加工", category: "机械结构与仿真 (Mechanical & Simulation)" },
  { id: "urdf-xacro", name: "URDF/Xacro 建模", category: "机械结构与仿真 (Mechanical & Simulation)" },

  // 7. 感知与传感器 (Perception & Sensors)
  { id: "lidar", name: "LiDAR (激光雷达)", category: "感知与传感器 (Perception & Sensors)" },
  { id: "rgbd", name: "RGB-D 相机 (RealSense)", category: "感知与传感器 (Perception & Sensors)" },
  { id: "imu", name: "IMU (惯导)", category: "感知与传感器 (Perception & Sensors)" },
  { id: "ultrasonic", name: "超声波雷达", category: "感知与传感器 (Perception & Sensors)" },
  { id: "mmwave", name: "毫米波雷达", category: "感知与传感器 (Perception & Sensors)" },
  { id: "tactile", name: "触觉传感器", category: "感知与传感器 (Perception & Sensors)" },
  { id: "optical-flow", name: "光流法", category: "感知与传感器 (Perception & Sensors)" },
  { id: "vio-slam", name: "VIO/SLAM", category: "感知与传感器 (Perception & Sensors)" },

  // 8. 软件工程与运维 (Software Engineering)
  { id: "linux", name: "Linux (Ubuntu)", category: "软件工程与运维 (Software Engineering)" },
  { id: "docker", name: "Docker", category: "软件工程与运维 (Software Engineering)" },
  { id: "k8s", name: "Kubernetes (K8s)", category: "软件工程与运维 (Software Engineering)" },
  { id: "git", name: "Git", category: "软件工程与运维 (Software Engineering)" },
  { id: "ci-cd", name: "CI/CD", category: "软件工程与运维 (Software Engineering)" },
  { id: "cpp14-17", name: "C++14/17", category: "软件工程与运维 (Software Engineering)" },
  { id: "python-lang", name: "Python", category: "软件工程与运维 (Software Engineering)" },
  { id: "rust", name: "Rust", category: "软件工程与运维 (Software Engineering)" },
  { id: "cmake", name: "CMake", category: "软件工程与运维 (Software Engineering)" },
  { id: "gdb", name: "gdb 调试", category: "软件工程与运维 (Software Engineering)" },

  // 9. 设计与交互 (Design & Product)
  { id: "industrial-design", name: "工业设计 (Rhino/KeyShot)", category: "设计与交互 (Design & Product)" },
  { id: "interaction-design", name: "交互设计 (Figma)", category: "设计与交互 (Design & Product)" },
  { id: "web-frontend", name: "Web前端 (React/Next.js)", category: "设计与交互 (Design & Product)" },
  { id: "hmi", name: "HMI (人机界面)", category: "设计与交互 (Design & Product)" },
  { id: "ux", name: "用户体验 (UX)", category: "设计与交互 (Design & Product)" },

  // 10. 具身智能与强化学习 (Embodied AI & RL)
  { id: "rl-ppo", name: "PPO (近端策略优化)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "rl-sac", name: "SAC (柔性演员-评论家)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "rl-dqn", name: "DQN", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "rl-td3", name: "TD3", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "reward-engineering", name: "Reward Engineering (奖励函数设计)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "bc", name: "BC (行为克隆)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "dagger", name: "Dagger", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "inverse-rl", name: "Inverse RL (逆向强化学习)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "sim2real", name: "Sim2Real (虚实迁移)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "domain-randomization", name: "Domain Randomization (域随机化)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "domain-adaptation", name: "Domain Adaptation", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "vlm", name: "VLM (视觉语言模型)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "robot-transformer", name: "Robot Transformer (RT-1/RT-2)", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "foundation-models", name: "Foundation Models", category: "具身智能与强化学习 (Embodied AI & RL)" },
  { id: "prompt-tuning", name: "Prompt Tuning", category: "具身智能与强化学习 (Embodied AI & RL)" },

  // 11. 计算机视觉与三维感知 (Computer Vision & 3D)
  { id: "3dgs", name: "3D Gaussian Splatting (3DGS)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "nerf", name: "NeRF (神经辐射场)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "photogrammetry", name: "Photogrammetry", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "sfm", name: "Structure from Motion (SfM)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "pcl", name: "PCL (Point Cloud Library)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "open3d", name: "Open3D", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "pointnet", name: "PointNet / PointNet++", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "point-cloud-registration", name: "点云配准 (ICP/NDT)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "yolo", name: "YOLO (目标检测)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "mask-rcnn", name: "Mask R-CNN (实例分割)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "vit", name: "Transformer (ViT)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "clip", name: "CLIP", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "depth-estimation", name: "深度估计 (Depth Estimation)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "opencv", name: "OpenCV", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "feature-extraction", name: "特征提取 (ORB/SIFT)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },
  { id: "camera-calibration", name: "相机标定 (Calibration)", category: "计算机视觉与三维感知 (Computer Vision & 3D)" },

  // 12. 定位导航与 SLAM (Localization & Mapping)
  { id: "orb-slam3", name: "ORB-SLAM3 (视觉)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "cartographer", name: "Cartographer (激光)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "lio-sam", name: "LIO-SAM (雷达惯导融合)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "vins-mono", name: "VINS-Mono", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "fast-lio", name: "FAST-LIO", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "kalman-filter", name: "Kalman Filter (EKF/UKF)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "particle-filter", name: "Particle Filter (粒子滤波)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "graph-optimization", name: "Graph Optimization (g2o/Ceres)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "octomap", name: "OctoMap (八叉树)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "hd-map", name: "HD Map (高精地图)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "grid-map", name: "Grid Map (栅格地图)", category: "定位导航与 SLAM (Localization & Mapping)" },
  { id: "semantic-map", name: "Semantic Map (语义地图)", category: "定位导航与 SLAM (Localization & Mapping)" },

  // 13. 路径规划与运动生成 (Planning & Control)
  { id: "astar", name: "A* Algorithm", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "dijkstra", name: "Dijkstra", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "rrt", name: "RRT / RRT*", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "hybrid-astar", name: "Hybrid A*", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "teb", name: "TEB (时间弹性带)", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "dwa", name: "DWA (动态窗口法)", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "mpc-tracking", name: "MPC 轨迹跟踪", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "minimum-snap", name: "Minimum Snap", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "jerk-optimization", name: "Jerk Optimization", category: "路径规划与运动生成 (Planning & Control)" },
  { id: "b-spline", name: "B-Spline (B样条)", category: "路径规划与运动生成 (Planning & Control)" },

  // 14. 机器人系统与调优 (System & Tuning)
  { id: "ros1", name: "ROS 1 (Noetic)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "ros2", name: "ROS 2 (Humble/Jazzy)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "ros-control", name: "ROS Control", category: "机器人系统与调优 (System & Tuning)" },
  { id: "moveit", name: "MoveIt (机械臂规划)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "nav2", name: "Nav2 (导航栈)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "dds-stack", name: "DDS (FastDDS/CycloneDDS)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "lcm", name: "LCM", category: "机器人系统与调优 (System & Tuning)" },
  { id: "protobuf", name: "Protobuf", category: "机器人系统与调优 (System & Tuning)" },
  { id: "grpc", name: "gRPC", category: "机器人系统与调优 (System & Tuning)" },
  { id: "zenoh", name: "Zenoh", category: "机器人系统与调优 (System & Tuning)" },
  { id: "rviz", name: "Rviz", category: "机器人系统与调优 (System & Tuning)" },
  { id: "foxglove", name: "Foxglove", category: "机器人系统与调优 (System & Tuning)" },
  { id: "gazebo-sim", name: "Gazebo", category: "机器人系统与调优 (System & Tuning)" },
  { id: "isaac-sim", name: "Isaac Sim", category: "机器人系统与调优 (System & Tuning)" },
  { id: "pid-tuning", name: "PID Tuning (参数整定)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "system-id", name: "System Identification (系统辨识)", category: "机器人系统与调优 (System & Tuning)" },
  { id: "gpt", name: "基础大模型: GPT", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "blip-2", name: "BLIP-2", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "llava", name: "LLaVA", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "cogvlm", name: "CogVLM", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "siglip", name: "SigLIP", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "rt-1", name: "RT-1 (Robot Transformer)", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "rt-2", name: "RT-2 (Robot Transformer)", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "palm-e", name: "PaLM-E", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "octo", name: "Octo", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "rfm-1", name: "RFM-1", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "langchain", name: "LangChain", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "llamaindex", name: "LlamaIndex", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "autogpt", name: "AutoGPT", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "semantic-kernel", name: "Semantic Kernel", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "diffusion-policy", name: "Diffusion Policy (扩散策略)", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "text-to-motion", name: "Text-to-Motion", category: "生成式 AI 与大模型 (Generative AI & LLMs)" },
  { id: "cuda", name: "CUDA (NVIDIA)", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "tensorrt", name: "TensorRT (推理加速)", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "onnx-runtime", name: "ONNX Runtime", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "deepspeed", name: "DeepSpeed (分布式训练)", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "megatron-lm", name: "Megatron-LM", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "jetson-orin-optim", name: "Jetson Orin 优化", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "horizon-toolchain", name: "Horizon 芯片工具链", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "tvm", name: "TVM", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "quantization-int8", name: "模型量化 (Quantization/Int8)", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "synthetic-data", name: "合成数据生成", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "blender-synth", name: "Blender 合成数据", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "ue5-synth", name: "UE5 合成数据", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "label-studio", name: "Label Studio", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "vector-db", name: "向量数据库", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "milvus", name: "Milvus", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "pinecone", name: "Pinecone", category: "AI 基础设施与 MLOps (AI Infra & Deployment)" },
  { id: "whisper", name: "Whisper (ASR)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "kaldi", name: "Kaldi (ASR)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "funasr", name: "FunASR (ASR)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "vits", name: "VITS (TTS)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "cosyvoice", name: "CosyVoice (TTS)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "chattts", name: "ChatTTS (TTS)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "emotion-ai", name: "情感计算 (Emotion AI)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "gaze-tracking", name: "视线追踪 (Gaze Tracking)", category: "语音与多模态交互 (Voice & HRI)" },
  { id: "gesture-control", name: "手势控制", category: "语音与多模态交互 (Voice & HRI)" },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "具身智能算法工程师",
    company: "Future Robotics",
    salary: "30k-50k",
    requiredSkills: {
      ros2: "Senior",
      opencv: "Mid",
      "cpp14-17": "Senior",
    },
  },
  {
    id: "job-2",
    title: "强化学习研究员",
    company: "AI Lab",
    salary: "40k-70k",
    requiredSkills: {
      "rl-ppo": "Senior",
      "python-lang": "Senior",
      "isaac-sim": "Mid",
    },
  },
  {
    id: "job-3",
    title: "机械臂控制工程师",
    company: "Cobot Corp",
    salary: "25k-45k",
    requiredSkills: {
      moveit: "Senior",
      "pid-control": "Mid",
      "cpp14-17": "Mid",
      ros2: "Mid",
    },
  },
];
