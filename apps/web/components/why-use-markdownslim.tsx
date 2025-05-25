"use client";

import { motion } from "framer-motion";
import { DollarSign, Zap, BarChart3, Settings } from "lucide-react";

export function WhyUseMarkdownSlim() {
  const benefits = [
    {
      icon: DollarSign,
      title: "💰 API 비용 절감",
      description:
        "토큰 사용량을 최대 40% 줄여 OpenAI, Anthropic 등의 LLM API 비용을 대폭 절감합니다.",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: Zap,
      title: "⚡ 처리 속도 향상",
      description:
        "적은 토큰으로 더 빠른 LLM 응답을 받을 수 있어 실시간 애플리케이션 성능이 향상됩니다.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
    },
    {
      icon: BarChart3,
      title: "📊 컨텍스트 효율성",
      description:
        "제한된 컨텍스트 윈도우 내에서 더 많은 실질적 정보를 포함할 수 있습니다.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      icon: Settings,
      title: "🔧 프롬프트 최적화",
      description:
        "절약된 토큰으로 더 상세한 지시사항이나 예시를 추가하여 LLM 성능을 향상시킵니다.",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          왜 마크다운 압축이 필요한가요?
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-gold-300/50 to-cyan-500/50 mx-auto mb-6"></div>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          LLM 시대에 맞춘 마크다운 최적화로 토큰 효율성을 극대화하고 AI
          애플리케이션의 성능과 비용 효율성을 동시에 개선하세요.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={index}
              className={`p-6 rounded-lg border ${benefit.bgColor} ${benefit.borderColor} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${benefit.bgColor} ${benefit.borderColor} border`}
                >
                  <IconComponent size={24} className={benefit.color} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="mt-12 p-6 bg-gray-900/50 rounded-lg border border-gray-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          실제 사용 사례
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-2">40%</div>
            <div className="text-gray-400">평균 토큰 절약률</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">$0.012</div>
            <div className="text-gray-400">1K 토큰당 절약 비용</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-400 mb-2">2x</div>
            <div className="text-gray-400">컨텍스트 활용도 향상</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p className="text-gray-500 text-sm">
          * 실제 절약 효과는 마크다운 내용과 사용하는 LLM 모델에 따라 달라질 수
          있습니다.
        </p>
      </motion.div>
    </section>
  );
}
